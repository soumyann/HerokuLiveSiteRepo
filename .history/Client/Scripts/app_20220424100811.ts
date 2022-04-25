// IIFE -- Immediately Invoked Function Expression
// AKA Anonymous Self-Executing Function
(function()
{
    function AuthGuard(): void
    {
        let protected_routes: string[] = [
            "/contact-list",
            "/edit"
        ];
    
        if(protected_routes.indexOf(location.pathname) > -1)
        {
            // if user does not exist in session storage
            if(!sessionStorage.getItem("user"))
            {
                // if not...change the active link to the login page
                location.href = "/login";
            }
        }
    }


    function AddLinkEvents(link: string): void
    {
        let linkQuery = $(`a.link[href='/${link}']`);

        // remove all link events
        linkQuery.off("click");
        linkQuery.off("mouseover");
        linkQuery.off("mouseout");

        // add css to adjust link aesthetic
        linkQuery.css("text-decoration", "underline");
        linkQuery.css("color", "blue");

        // add link events
        linkQuery.on("click", function()
        {
            location.href = `/${link}`;
        });

        linkQuery.on("mouseover", function()
        {
            $(this).css('cursor', 'pointer');
            $(this).css('font-weight', 'bold');
        });

        linkQuery.on("mouseout", function()
        {
            $(this).css('font-weight', 'normal');
        });
    }

    function DisplayAboutPage(): void
    {
        console.log("About Us Page");
    }

    function DisplayProductsPage(): void
    {
        console.log("Products Page");
    }

    function DisplayServicesPage(): void
    {
        console.log("Services Page");
    }

    function DisplayHomePage(): void
    {
        console.log("Home Page");

        $("#AboutUsButton").on("click", function()
        {
            location.href = "/about";
        });

        $("main").append(`<p id="MainParagraph" class="mt-3">This is the Main Paragraph</p>`);
        //Article.innerHTML = ArticleParagraph;
        $("main").append(`<article>
        <p id="ArticleParagraph" class="mt-3">This is the Article Paragraph</p>
        </article>`);
    }

    /**
     * Adds a Contact Object to localStorage
     *
     * @param {string} fullName
     * @param {string} contactNumber
     * @param {string} emailAddress
     */
    function AddContact(fullName: string , contactNumber: string, emailAddress: string)
    {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if(contact.serialize())
        {
            let key = contact.FullName.substring(0, 1) + Date.now();

            localStorage.setItem(key, contact.serialize() as string);
        }
    }

    /**
     * This method validates an input text field in the form and displays
     * an error in the message area div element
     *
     * @param {string} input_field_ID
     * @param {RegExp} regular_expression
     * @param {string} error_message
     */
    function ValidateField(input_field_ID: string, regular_expression: RegExp, error_message: string)
    {
        let messageArea = $("#messageArea").hide();

        $("#" + input_field_ID).on("blur", function()
        {
            let input_text_field = $(this).val() as string; 
            if(!regular_expression.test(input_text_field)) 
            {
                $(this).trigger("focus").trigger("select"); 
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else 
            {
                messageArea.removeAttr("class").hide();
            } 
        });
    }

    /**
     * This method Validates the fullName, contactNumber and emailAddress fields of a form
     * 
     * @s {void}
     */
    function ContactFormValidation(): void
    {
        ValidateField("fullName",/^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{1,25})+(\s|,|-)([A-Z][a-z]{1,25})+(\s|,|-)*$/,"Please enter a valid Full Name. This must include at least a Capitalized first name followed by a Capitalized last Name.");
        ValidateField("contactNumber",/^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]?\d{4}$/,"Please enter a valid Contact Number. Example: (905) 555-5555");
        ValidateField("emailAddress",/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/,"Please enter a valid Email Address.");
    }

    function DisplayContactPage(): void
    {
        console.log("Contact Us Page");

        $("a[data='contact-list']").off("click");
        $("a[data='contact-list']").on("click", function()
        {
            location.href = "/contact-list";
        });

        ContactFormValidation();
        
        let sendButton = document.getElementById("sendButton") as HTMLElement;

        let subscribeCheckbox = document.getElementById("subscribeCheckbox") as HTMLInputElement;

        sendButton.addEventListener("click", function(event)
        {
            //event.preventDefault();

            let fullName = document.forms[0].fullName.value as string;
            let contactNumber = document.forms[0].contactNumber.value as string;
            let emailAddress = document.forms[0].emailAddress.value as string;

            if(subscribeCheckbox.checked)
            {
                AddContact(fullName, contactNumber, emailAddress);
            }
        });
    }

    function DisplayContactListPage(): void
    {
        console.log("Contact-List Page");

        $("a.delete").on("click", function(event)
        {
            if(!confirm("Are you sure?"))
            {
                event.preventDefault();
                location.href = "/contact-list";
            }
        });

    }

    function DisplayEditPage(): void
    {
        console.log("Edit Page");

        ContactFormValidation();
    }

    function CheckLogin(): void
    {
        // if user is logged in
        if(sessionStorage.getItem("user"))
        {
            // swap out the login link for the logout link
            $("#login").html(
                `<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`
            );

            $("#logout").on("click", function()
            {
                // perform logout
                sessionStorage.clear();

                // swap out the logout link for the login link
                $("#login").html(
                    `<a class="nav-link" data="login"><i class="fas fa-sign-in-alt"></i> Login</a>`
                );

                // redirect back to login
                location.href = "/login";
            });
        }
    }

    function DisplayLoginPage(): void
    {
        console.log("Login Page");
    }

    function DisplayRegisterPage(): void
    {
        console.log("Register Page");
        //TODO: Future work - add some validation
    }

    function Display404Page(): void
    {

    }

    // named function
    function Start(): void
    {
        console.log("App Started!!");

        let page_id = $("body")[0].getAttribute("id");

        switch(page_id)
        {
            case "home":  
                DisplayHomePage();
                break;
            case "about":  
                DisplayAboutPage();
                break;
            case "products":  
                DisplayProductsPage();
                break;
            case "services":    
                DisplayServicesPage();
                break;
            case "contact":  
                DisplayContactPage();
                break;
            case "contact-list":  
                DisplayContactListPage();
                break;
            case "edit":  
                DisplayEditPage();
                break;
            case "add":
                DisplayEditPage();
                break;
            case "login":  
                DisplayLoginPage();
                break;
            case "register":  
                DisplayRegisterPage();
                break;
            case "404":  
                Display404Page();
                break;
        }
    }

    window.addEventListener("load", Start);

})();