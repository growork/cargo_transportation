class RemoveDestinationCityFromOrder < ActiveRecord::Migration[6.0]
  def change
    remove_column :orders, :destination_city, :string
  end
end
