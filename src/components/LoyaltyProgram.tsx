import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

const LoyaltyProgram = () => {
  const userLevel = "Охотник";
  const currentPoints = 2840;
  const nextLevelPoints = 5000;
  const progress = (currentPoints / nextLevelPoints) * 100;

  const levels = [
    {
      name: "Новичок",
      points: 0,
      discount: 0,
      color: "bg-gray-500",
      icon: "User",
    },
    {
      name: "Охотник",
      points: 1000,
      discount: 5,
      color: "bg-green-600",
      icon: "Target",
    },
    {
      name: "Убийца демонов",
      points: 5000,
      discount: 10,
      color: "bg-blue-600",
      icon: "Sword",
    },
    {
      name: "Легенда",
      points: 15000,
      discount: 15,
      color: "bg-purple-600",
      icon: "Crown",
    },
    {
      name: "Сын Спарды",
      points: 50000,
      discount: 20,
      color: "bg-red-600",
      icon: "Zap",
    },
  ];

  const benefits = [
    {
      icon: "Percent",
      title: "Скидки до 20%",
      description: "На все товары в магазине",
    },
    {
      icon: "Gift",
      title: "Эксклюзивные товары",
      description: "Доступ к лимитированным коллекциям",
    },
    {
      icon: "Truck",
      title: "Бесплатная доставка",
      description: "При покупке от 3000 ₽",
    },
    {
      icon: "Calendar",
      title: "Ранний доступ",
      description: "К новым коллекциям и распродажам",
    },
  ];

  return (
    <div className="bg-dmc-dark-light p-8 rounded-lg border border-dmc-gray-dark">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Devil May Cry Club
        </h2>
        <p className="text-dmc-gray-light">
          Программа лояльности для истинных охотников
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="bg-dmc-dark border-dmc-gray-dark">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Icon name="Award" className="text-dmc-red" />
              Ваш статус
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-dmc-gray-light">Текущий уровень:</span>
              <Badge className="bg-green-600 text-white">{userLevel}</Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-dmc-gray-light">Баллы:</span>
                <span className="text-white">
                  {currentPoints.toLocaleString()} /{" "}
                  {nextLevelPoints.toLocaleString()}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-dmc-gray-light">
                До следующего уровня:{" "}
                {(nextLevelPoints - currentPoints).toLocaleString()} баллов
              </p>
            </div>

            <div className="pt-4 border-t border-dmc-gray-dark">
              <div className="flex items-center justify-between">
                <span className="text-dmc-gray-light">Ваша скидка:</span>
                <span className="text-2xl font-bold text-dmc-red">5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dmc-dark border-dmc-gray-dark">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Icon name="Zap" className="text-dmc-red" />
              Как заработать баллы
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-dmc-gray-light">Покупка (1₽ = 1 балл)</span>
              <Icon name="ShoppingCart" size={16} className="text-dmc-red" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-dmc-gray-light">Отзыв о товаре</span>
              <Badge variant="secondary">+100</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-dmc-gray-light">Приглашение друга</span>
              <Badge variant="secondary">+500</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-dmc-gray-light">День рождения</span>
              <Badge variant="secondary">+1000</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">Уровни программы</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {levels.map((level, index) => (
            <Card
              key={level.name}
              className={`${
                level.name === userLevel
                  ? "bg-dmc-red border-dmc-red"
                  : "bg-dmc-dark border-dmc-gray-dark"
              } text-center`}
            >
              <CardContent className="p-4">
                <div
                  className={`w-12 h-12 rounded-full ${level.color} flex items-center justify-center mx-auto mb-2`}
                >
                  <Icon name={level.icon as any} className="text-white" />
                </div>
                <h4 className="font-semibold text-white text-sm mb-1">
                  {level.name}
                </h4>
                <p className="text-xs text-dmc-gray-light mb-2">
                  От {level.points.toLocaleString()} баллов
                </p>
                <Badge variant="secondary" className="text-xs">
                  -{level.discount}%
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">
          Привилегии участников
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="text-center p-4 bg-dmc-dark rounded-lg border border-dmc-gray-dark"
            >
              <Icon
                name={benefit.icon as any}
                size={32}
                className="text-dmc-red mx-auto mb-3"
              />
              <h4 className="font-semibold text-white mb-1">{benefit.title}</h4>
              <p className="text-sm text-dmc-gray-light">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Button className="bg-dmc-red hover:bg-dmc-red-dark text-white px-8">
          <Icon name="UserPlus" size={16} className="mr-2" />
          Присоединиться к программе
        </Button>
      </div>
    </div>
  );
};

export default LoyaltyProgram;
