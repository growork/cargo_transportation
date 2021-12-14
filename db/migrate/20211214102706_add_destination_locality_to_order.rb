class AddDestinationLocalityToOrder < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :destination_locality, :string
  end
end
