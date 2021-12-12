class AddDepartureCityToOrder < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :departure_city, :string
  end
end
