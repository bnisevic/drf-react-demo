from django.urls import reverse
from rest_framework.test import APITestCase
from .models import Product
from django.contrib.auth.models import User

class SpecBackendTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="alice", password="anything")
        self.login_url = reverse('knox_login')
        self.user_data = {"username": "alice", "password": "anything"}
        response = self.client.post(self.login_url, self.user_data, format='json')
        self.assertEqual(response.status_code, 200)
        self.token = response.data.get("token")
        self.assertIsNotNone(self.token)
        self.auth_header = {"HTTP_AUTHORIZATION": f"Token {self.token}"}

        self.product = Product.objects.create(
            name="Banana", description="Yellow", price=1.5, stock=50
        )

    def test_user_login_and_info(self):
        res = self.client.get(reverse("current-user"), **self.auth_header)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data["username"], "alice")

    def test_product_search(self):
        res = self.client.get(reverse("product-list"), {"search": "Banana"}, **self.auth_header)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data[0]["name"], "Banana")

    def test_product_selection(self):
        res = self.client.post(reverse("select-product", args=[self.product.pk]), **self.auth_header)
        self.assertEqual(res.status_code, 200)
        selected = self.client.get(reverse("selected-products"), **self.auth_header)
        self.assertEqual(len(selected.data), 1)
        self.assertEqual(selected.data[0]["id"], self.product.id)
