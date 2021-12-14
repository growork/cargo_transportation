class RemoveCoordinatesToFromOrder < ActiveRecord::Migration[6.0]
  def change
    remove_column :orders, :coordinates_to, :string
  end
end
