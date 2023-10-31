import Restaurant from './user.model.js';

export class RestaurantService {
  async findAllRestaurants() {
    return await Restaurant.findAll({
      where: {
        status: 'active',
      },
    });
  }

  async findOneRestaurant (id, restaurantId) {
    return await Restaurant.findOne({
        where: {
            id: restaurantId || id,
            status: 'active'
        }
    })
  }

  async createRestaurant (data) {
    return await Restaurant.create(data)
  }

  async updateRestaurant (restaurant, data) {
    return await restaurant.update(data)
  }

  async deleteRestaurant (restaurant) {
    return await restaurant.update({status: 'disable'})
  }
}
