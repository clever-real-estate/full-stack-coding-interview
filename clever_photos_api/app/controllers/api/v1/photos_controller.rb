class Api::V1::PhotosController < ApplicationController
  before_action :authenticate_user!

  def index
    @photos = ::PhotosService.new(current_user).all_photos

    render json: @photos, each_serializer: PhotoSerializer, scope: current_user
  end

  def like
    @photo = ::PhotosService.new(current_user).like_photo(params[:id])

    render json: @photo, serializer: PhotoSerializer, scope: current_user
  end

  def unlike
    @photo = ::PhotosService.new(current_user).unlike_photo(params[:id])

    render json: @photo, serializer: PhotoSerializer, scope: current_user
  end
end
