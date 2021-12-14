class RemoveDepartureCityFromOrder < ActiveRecord::Migration[6.0]
  def change
    remove_column :orders, :departure_city, :string
  end
end
