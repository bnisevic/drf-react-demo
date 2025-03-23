from django.urls import path
from .views import ProductListView, SelectProductView, CurrentUserView

urlpatterns = [
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/select/', SelectProductView.as_view(), name='select-product'),
    path('user/', CurrentUserView.as_view(), name='current-user'),
]
