'use client'
import React from "react";
import EditCategoy from "./categoriresComponent/editCategories";
import NewCategory from "./categoriresComponent/newCategories";


export default function CategoriesPlayground ({state } : {state : string}) {



    return (
        <div className="mt-0 border-0 p-0">
        {(() => {
          switch (state) {
            case 'edit':
              return < EditCategoy/>;
            case 'new':
              return < NewCategory />;
            default:
              return null;
          }
        })()}
    </div>
    )
}