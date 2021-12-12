class ChangeOrderCoordinatesFrom < ActiveRecord::Migration[6.0]
  def self.up
    change_table :orders do |t|
      t.change :coordinates_from, :string
      t.change :coordinates_to, :string
    end
  end
  def self.down
    change_table :orders do |t|
      t.change :coordinates_from, :float
      t.change :coordinates_to, :float
    end
  end
end
