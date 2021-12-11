class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.float :width
      t.float :height
      t.float :length
      t.float :overall_volume
      t.float :coordinates_from
      t.float :coordinates_to
      t.integer :distance
      t.integer :price

      t.timestamps
    end
  end
end
