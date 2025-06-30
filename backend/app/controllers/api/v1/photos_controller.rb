class Api::V1::PhotosController < ApplicationController
  def index
    @photos = Photo.includes(:user, :likes).order(created_at: :desc)

    render json: @photos, include: [:user, :likes]
  end
end
