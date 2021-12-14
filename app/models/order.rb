class Order < ApplicationRecord
  before_create :calculate_price

  validates :width, :height, :length, :overall_volume,
            :distance, :weight, presence: true, numericality: true
  validates :departure_locality, :destination_locality, presence: true
  

  scope :most_popular_localities, ->(count) {group('departure_locality').select(:departure_locality).order('count(departure_locality) desc').first(count)}

  private
  def calculate_price
    self.price = 500 + (distance * (width + height + length + overall_volume + weight))
  end
end
