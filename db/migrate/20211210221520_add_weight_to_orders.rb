class AddWeightToOrders < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :weight, :float
  end
end
