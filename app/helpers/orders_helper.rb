module OrdersHelper
  def most_popular_localities(count)
    Order.most_popular_localities(count)
  end
end
