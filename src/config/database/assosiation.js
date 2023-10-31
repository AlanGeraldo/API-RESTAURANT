import Restaurant from "../../modules/restaurant/user.model.js"
import Review from "../../modules/reviews/review.model.js"
import User from "../../modules/users/users.model.js"
import Meals from "../../modules/meals/meals.model.js"
import Order from "../../modules/orders/orders.model.js"

const initModel = () => {
    User.hasMany(Review)
    Review.belongsTo(User)

    Restaurant.hasMany(Review)
    Review.belongsTo(Restaurant)

    Restaurant.hasMany(Meals)
    Meals.belongsTo(Restaurant)

    Meals.hasMany(Order)
    Order.belongsTo(Meals)

}

export default initModel;