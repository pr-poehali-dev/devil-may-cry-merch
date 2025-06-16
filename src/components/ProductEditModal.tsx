import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Icon from "@/components/ui/icon";

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

interface ProductEditModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  isNew?: boolean;
}

const ProductEditModal = ({
  product,
  isOpen,
  onClose,
  onSave,
  isNew = false,
}: ProductEditModalProps) => {
  const [formData, setFormData] = useState<Product>({
    id: "",
    name: "",
    price: 0,
    originalPrice: undefined,
    image: "",
    character: "dante",
    category: "Оружие",
    rating: 5.0,
    inStock: true,
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else if (isNew) {
      setFormData({
        id: Date.now().toString(),
        name: "",
        price: 0,
        originalPrice: undefined,
        image: "",
        character: "dante",
        category: "Оружие",
        rating: 5.0,
        inStock: true,
      });
    }
  }, [product, isNew]);

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-dmc-dark border-dmc-gray max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">
            {isNew ? "Добавить товар" : "Редактировать товар"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="text-dmc-gray-light">Название</Label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-dmc-dark-light border-dmc-gray text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-dmc-gray-light">Цена</Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                className="bg-dmc-dark-light border-dmc-gray text-white"
              />
            </div>
            <div>
              <Label className="text-dmc-gray-light">Старая цена</Label>
              <Input
                type="number"
                value={formData.originalPrice || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    originalPrice: e.target.value
                      ? Number(e.target.value)
                      : undefined,
                  })
                }
                className="bg-dmc-dark-light border-dmc-gray text-white"
              />
            </div>
          </div>

          <div>
            <Label className="text-dmc-gray-light">Ссылка на изображение</Label>
            <Input
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="bg-dmc-dark-light border-dmc-gray text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-dmc-gray-light">Персонаж</Label>
              <Select
                value={formData.character}
                onValueChange={(value) =>
                  setFormData({ ...formData, character: value })
                }
              >
                <SelectTrigger className="bg-dmc-dark-light border-dmc-gray text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dmc-dark border-dmc-gray">
                  <SelectItem value="dante">Данте</SelectItem>
                  <SelectItem value="nero">Неро</SelectItem>
                  <SelectItem value="vergil">Вергилий</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-dmc-gray-light">Категория</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger className="bg-dmc-dark-light border-dmc-gray text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-dmc-dark border-dmc-gray">
                  <SelectItem value="Оружие">Оружие</SelectItem>
                  <SelectItem value="Одежда">Одежда</SelectItem>
                  <SelectItem value="Аксессуары">Аксессуары</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-dmc-gray-light">Рейтинг</Label>
              <Input
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: Number(e.target.value) })
                }
                className="bg-dmc-dark-light border-dmc-gray text-white"
              />
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <Switch
                checked={formData.inStock}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, inStock: checked })
                }
              />
              <Label className="text-dmc-gray-light">В наличии</Label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSave}
              className="bg-dmc-red hover:bg-dmc-red-dark flex-1"
            >
              <Icon name="Save" size={16} className="mr-2" />
              Сохранить
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="border-dmc-gray text-dmc-gray-light"
            >
              Отмена
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductEditModal;
