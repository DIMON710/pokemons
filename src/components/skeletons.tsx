import React from "react";

export function SkeletonImage() {
    return <div className="w-64 h-64 animate-pulse bg-slate-200" />;
}

export function SkeletonPokemonsField() {
    return (
        <>
            <SkeletonPokemonListing />
            <div className="p-8">Vs</div>
            <SkeletonPokemonListing />
            <div className="p-2" />
        </>
    );
}

const btn =
    "inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

export function SkeletonPokemonListing() {
    return (
        <div className="flex flex-col items-center relative">
            <SkeletonImage />
            <div className="w-64 h-4 bg-slate-200"></div>
            <button className={btn}>Rounder</button>
        </div>
    );
}
