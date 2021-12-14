class AddDepartureLocalityToOrder < ActiveRecord::Migration[6.0]
  def change
    add_column :orders, :departure_locality, :string
  end
end
