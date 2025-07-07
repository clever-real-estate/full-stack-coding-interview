class CreatePhotographers < ActiveRecord::Migration[8.0]
  def change
    create_table :photographers do |t|
      t.string :name
      t.string :url

      t.timestamps
    end
    add_index :photographers, :url, unique: true
  end
end
