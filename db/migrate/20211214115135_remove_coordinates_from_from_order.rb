class RemoveCoordinatesFromFromOrder < ActiveRecord::Migration[6.0]
  def change
    remove_column :orders, :coordinates_from, :string
  end
end
