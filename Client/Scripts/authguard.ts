"use strict";
(function()
{
    let protected_routes: string[] = [
        "contact-list"
    ];

    if(protected_routes.indexOf(router.ActiveLink) > -1)
    {
        // if user does not exist in session storage
        if(!sessionStorage.getItem("user"))
        {
            // redirect to the login page
            location.href = "/login";
        }
    }
  
})();