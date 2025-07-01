class UpdatePhotosForPexelsData < ActiveRecord::Migration[8.0]
  def change
    # Remove the old 'title' column as we'll use 'alt' now
    remove_column :photos, :title, :string

    # Add new columns to store the rich data from Pexels
    add_column :photos, :pexels_id, :integer, null: false
    add_column :photos, :width, :integer
    add_column :photos, :height, :integer
    add_column :photos, :photographer, :string
    add_column :photos, :photographer_url, :string
    add_column :photos, :avg_color, :string
    add_column :photos, :alt_text, :text

    # Add an index to pexels_id to ensure it's unique and for faster lookups
    add_index :photos, :pexels_id, unique: true
  end
end
