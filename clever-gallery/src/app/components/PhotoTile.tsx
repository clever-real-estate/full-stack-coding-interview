"use client";
import { useEffect, useState } from "react";
import { Photo } from "../model/Photo";
import Link from "next/link";
import { LinkIcon, Star } from "lucide-react";

export default function PhotoTile({
  photo,
  onAddFavorite,
  onRemoveFavorite,
}: {
  photo: Photo;
  onAddFavorite: (id: string) => void;
  onRemoveFavorite: (id: string) => void;
}) {
  return (
    <div key={photo.id} className="flex items-start gap-3 mb-6">
      <button
        onClick={() =>
          photo.isFavorite
            ? onRemoveFavorite(photo.id)
            : onAddFavorite(photo.id)
        }
        className="focus:outline-none hover:cursor-pointer"
        aria-label={photo.isFavorite ? "Unfavorite" : "Favorite"}
      >
        <Star
          className={`w-5 h-5 ${
            photo.isFavorite
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-400"
          }`}
        />
      </button>
      <div className="flex items-start w-full justify-between">
        <div className="flex items-start gap-2">
          <div className="flex-shrink-0 w-[75px] h-[75px] bg-gray-200 rounded overflow-hidden">
            {photo.imageUrl ? (
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="object-cover w-full h-full"
              />
            ) : null}
          </div>

          <div className="flex-1 h-full">
            <div className="font-bold text-sm text-gray-900">
              {photo.photographer}
            </div>
            <div className="text-gray-800 text-sm">{photo.title}</div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <span className="text-sm">{photo.hexColor}</span>
              <span
                className="w-4 h-4 rounded-sm border"
                style={{ backgroundColor: photo.hexColor }}
              />
            </div>
          </div>
        </div>
        <Link
          href={photo.portfolioUrl}
          className="text-[#0075EB] text-xs flex items-center gap-1 hover:underline ml-2"
        >
          <LinkIcon size={12} />
          Portfolio
        </Link>
      </div>
    </div>
  );
}
