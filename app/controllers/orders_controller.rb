class OrdersController < ApplicationController

  # GET /orders or /orders.json
  def index
    @orders = Order.all
  end

  # GET /orders/1 or /orders/1.json
  def show
    @order = Order.find(params[:id])

    respond_to do |format|
        format.html
        format.json { render :json => @order }
    end
  end

  # GET /orders/new
  def new
    @order = Order.new
  end

  # POST /orders or /orders.json
  def create
    @order = Order.new(order_params)

    if @order.save
      redirect_to @order
    else
      render :new
    end
  end

  private
    # Only allow a list of trusted parameters through.
    def order_params
      params.require(:order).permit(:width, :height, :length, :overall_volume, :departure_locality, :destination_locality, :distance, :weight)
    end
end
