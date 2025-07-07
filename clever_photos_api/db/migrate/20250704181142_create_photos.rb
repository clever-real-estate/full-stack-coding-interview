class CreatePhotos < ActiveRecord::Migration[8.0]
  def change
    create_table :photos do |t|
      t.integer :width, null: false
      t.integer :height, null: false
      t.string :url, null: false
      t.string :avg_color, null: false
      t.string :src_original, null: false
      t.string :src_large2x
      t.string :src_large
      t.string :src_medium
      t.string :src_small
      t.string :src_portrait
      t.string :src_landscape
      t.string :src_tiny
      t.text :alt
      t.references :photographer, null: false, foreign_key: true

      t.timestamps
    end

    add_index :photos, :url, unique: true
  end
end
