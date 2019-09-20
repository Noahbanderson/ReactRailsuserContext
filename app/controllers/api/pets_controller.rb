class Api::PetsController < ApplicationController
  before_action :set_pets, only: [:show, :update, :destroy]
  before_action :set_user

  def index
    render json: @user.pets
  end

  def show
    render json: @pet
  end

  def create
    pet = @user.pets.new(pet_params)
    if pet.save
      render json: pet
    else
      render json: {errors: @pet.error}, status: :unprocessable_entity
    end
  end

  def update
    if @pet.update(pet_params)
      render json: @pet
    else
      render json: {errors: @pet.error}, status: :unprocessable_entity
    end
  end

  def destroy
    @pet.destroy
    render json: {message: "Pet Deleted #{@pet.name}"}
  end

  private
    
    def set_pets
      @pet = Pet.find(params[:id])
    end

    def set_user
      @user = User.find(params[:user_id])
    end

    def pet_params
      params.require(:pet).permit(:name, :species,)
    end
end
