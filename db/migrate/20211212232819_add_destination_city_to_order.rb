class AddDestinationCityToOrder < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :destination_city, :string
  end
end
