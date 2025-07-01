module Api
  module V1
    class LikesController < ApplicationController
      before_action :set_photo

      def create
        @like = @photo.likes.new(user: @current_user)

        if @like.save
          render json: @photo, include: [:user, :likes], status: :created
        else
          render json: { errors: @like.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        @like = @photo.likes.find_by(id: params[:id], user: @current_user)

        if @like
          @like.destroy
          render json: @photo, include: [:user, :likes], status: :ok
        else
          render json: { error: "Like not found or you're not authorized to unlike it." }, status: :not_found
        end
      end

      private

      def set_photo
        @photo = Photo.find(params[:photo_id])
      end
    end
  end
end
