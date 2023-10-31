import Order from '../orders/orders.model.js';
import Restaurant from '../restaurant/user.model.js';
import Meals from './meals.model.js';

export class MealsService {
  async createMeals(data) {
    return await Meals.create(data);
  }

  async findAllMeals() {
    return await Meals.findAll({
      where: {
        status: 'active',
      },
    });
  }

  async findOneMeal (id) {
    return await Meals.findOne({
        where: {
            id,
            status: 'active',
        },
        include: [
            {
                model: Restaurant,
            }
        ]
    })
  }


  async updatedMeal (meal, data) {
    return await meal.update(data)
  }

  async deleteMeal (meal) {
    return await meal.update({ status: 'disable'})
  }

}
