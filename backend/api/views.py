from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import Product
from .serializers import ProductSerializer, UserSerializer

class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        query = self.request.query_params.get('search', '')
        return Product.objects.filter(name__icontains=query)


class SelectProductView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        product = Product.objects.get(pk=pk)
        product.selected_by.add(request.user)
        return Response({'status': 'selected'})


class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
