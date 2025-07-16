class CreatePhotos < ActiveRecord::Migration[8.0]
  def change
    create_table :photos do |t|
      t.integer :pexels_id
      t.integer :width
      t.integer :height
      t.string :url
      t.string :photographer
      t.string :photographer_url
      t.integer :photographer_id
      t.string :avg_color
      t.string :src_original
      t.string :src_large2x
      t.string :src_large
      t.string :src_medium
      t.string :src_small
      t.string :src_portrait
      t.string :src_landscape
      t.string :src_tiny
      t.text :alt
      t.integer :likes_count, default: 0, null: false

      t.timestamps
    end
  end
end
