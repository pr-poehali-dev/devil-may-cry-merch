import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Icon from "@/components/ui/icon";
import ProductEditModal from "@/components/ProductEditModal";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  character: string;
  category: string;
  rating: number;
  inStock: boolean;
}

interface ProductGalleryProps {
  activeFilter: string | null;
}

const ProductGallery = ({ activeFilter }: ProductGalleryProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: 'Меч Данте "Rebellion"',
      price: 15999,
      originalPrice: 18999,
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      character: "dante",
      category: "Оружие",
      rating: 5.0,
      inStock: true,
    },
    {
      id: "2",
      name: "Красное пальто Данте",
      price: 8499,
      image:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
      character: "dante",
      category: "Одежда",
      rating: 4.8,
      inStock: true,
    },
    {
      id: "3",
      name: "Демоническая рука Неро",
      price: 12999,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      character: "nero",
      category: "Аксессуары",
      rating: 4.9,
      inStock: false,
    },
    {
      id: "4",
      name: 'Катана Вергилия "Yamato"',
      price: 22999,
      image:
        "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&h=600&fit=crop",
      character: "vergil",
      category: "Оружие",
      rating: 5.0,
      inStock: true,
    },
    {
      id: "5",
      name: "Синее пальто Неро",
      price: 7999,
      originalPrice: 9999,
      image:
        "https://images.unsplash.com/photo-1525171254930-643fc658b64e?w=800&h=600&fit=crop",
      character: "nero",
      category: "Одежда",
      rating: 4.7,
      inStock: true,
    },
    {
      id: "6",
      name: "Темный плащ Вергилия",
      price: 11999,
      image:
        "https://images.unsplash.com/photo-1506629905821-b2e4e7e6652c?w=800&h=600&fit=crop",
      character: "vergil",
      category: "Одежда",
      rating: 4.9,
      inStock: true,
    },
  ]);

  const filteredProducts = activeFilter
    ? products.filter((product) => product.character === activeFilter)
    : products;

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsNewProduct(false);
    setIsEditModalOpen(true);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsNewProduct(true);
    setIsEditModalOpen(true);
  };

  const handleSaveProduct = (updatedProduct: Product) => {
    if (isNewProduct) {
      setProducts([...products, updatedProduct]);
    } else {
      setProducts(
        products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
      );
    }
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId));
    setDeleteProductId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          Каталог товаров {activeFilter && `(${filteredProducts.length})`}
        </h2>
        <div className="flex gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Switch
              checked={isAdminMode}
              onCheckedChange={setIsAdminMode}
              className="data-[state=checked]:bg-dmc-red"
            />
            <Label className="text-dmc-gray-light">Режим админа</Label>
          </div>

          {isAdminMode && (
            <Button
              onClick={handleAddProduct}
              className="bg-green-600 hover:bg-green-700"
              size="sm"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить товар
            </Button>
          )}

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-dmc-gray text-dmc-gray-light"
            >
              <Icon name="Filter" size={16} className="mr-2" />
              Сортировка
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-dmc-gray text-dmc-gray-light"
            >
              <Icon name="Grid3X3" size={16} />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="bg-dmc-dark-light border-dmc-gray-dark hover:border-dmc-red transition-all duration-300 cursor-pointer group"
            onClick={() => setSelectedProduct(product)}
          >
            <CardContent className="p-0">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {!product.inStock && (
                  <Badge className="absolute top-3 left-3 bg-red-600 text-white">
                    Нет в наличии
                  </Badge>
                )}
                {product.originalPrice && (
                  <Badge className="absolute top-3 right-3 bg-dmc-red text-white">
                    Скидка
                  </Badge>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <Button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-dmc-red hover:bg-dmc-red-dark">
                    <Icon name="Eye" size={16} className="mr-2" />
                    Подробнее
                  </Button>
                </div>
              </div>

              <div className="p-4 space-y-3">
                {isAdminMode && (
                  <div className="flex gap-2 mb-3">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditProduct(product);
                      }}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Icon name="Edit" size={14} className="mr-1" />
                      Изменить
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteProductId(product.id);
                      }}
                      size="sm"
                      variant="destructive"
                    >
                      <Icon name="Trash2" size={14} className="mr-1" />
                      Удалить
                    </Button>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Icon
                      name="Star"
                      size={14}
                      className="text-yellow-500 fill-yellow-500"
                    />
                    <span className="text-sm text-dmc-gray-light">
                      {product.rating}
                    </span>
                  </div>
                </div>

                <h3 className="font-semibold text-white group-hover:text-dmc-red transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-dmc-red">
                      {product.price.toLocaleString()} ₽
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-dmc-gray line-through">
                        {product.originalPrice.toLocaleString()} ₽
                      </span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    className="bg-dmc-red hover:bg-dmc-red-dark"
                    disabled={!product.inStock}
                  >
                    <Icon name="ShoppingCart" size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Icon
            name="Package"
            size={48}
            className="mx-auto text-dmc-gray mb-4"
          />
          <h3 className="text-xl font-semibold text-white mb-2">
            Товары не найдены
          </h3>
          <p className="text-dmc-gray-light">
            Попробуйте изменить фильтр или посмотреть все товары
          </p>
        </div>
      )}

      <ProductEditModal
        product={editingProduct}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProduct}
        isNew={isNewProduct}
      />

      <AlertDialog
        open={!!deleteProductId}
        onOpenChange={() => setDeleteProductId(null)}
      >
        <AlertDialogContent className="bg-dmc-dark border-dmc-gray">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Удалить товар?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-dmc-gray-light">
              Это действие нельзя отменить. Товар будет удален из каталога.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-dmc-gray text-dmc-gray-light">
              Отмena
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deleteProductId && handleDeleteProduct(deleteProductId)
              }
              className="bg-red-600 hover:bg-red-700"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductGallery;
