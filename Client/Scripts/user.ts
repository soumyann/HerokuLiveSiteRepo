namespace core
{
    export class User
    {
        // private instance members
        private m_displayName: string;
        private m_emailAddress: string;
        private m_username: string;
        private m_password: string

        // getters and setters
        public get DisplayName(): string
        {
            return this.m_displayName;
        }

        public set DisplayName(display_name: string)
        {
            this.m_displayName = display_name;
        }

        public get EmailAddress(): string
        {
            return this.m_emailAddress;
        }

        public set EmailAddress(email_address: string)
        {
            this.m_emailAddress = email_address;
        }

        public get Username(): string
        {
            return this.m_username;
        }

        public set Username(username: string)
        {
            this.m_username = username;
        }

        public get Password(): string
        {
            return this.m_password;
        }

        public set Password(password: string)
        {
            this.m_password = password;
        }

        // constructor
        constructor(displayName:string = "", emailAddress:string = "", username:string  = "", password:string = "")
        {
            this.m_displayName = displayName;
            this.m_emailAddress = emailAddress;
            this.m_username = username;
            this.m_password = password;
        }

        // overridden functions

        /**
         * This method overrides the built-in toString method and returns the objects properties as string
         * @override
         * @returns {string}
         */
        toString(): string
        {
            return `Display Name  : ${this.DisplayName}\nEmail Address : ${this.EmailAddress}\nUsername : ${this.Username}`;
        }

        // utility functions
        //TODO: Need to change the return type
        toJSON()
        {
            return {
                "DisplayName": this.DisplayName,
                "EmailAddress": this.EmailAddress,
                "Username": this.Username
            }
        }

        //TODO: need to change the parameter data type
        fromJSON(data: any)
        {
            this.DisplayName = data.DisplayName;
            this.EmailAddress = data.EmailAddress;
            this.Username = data.Username;
            this.Password = data.Password;
        }

        /**
         * This method converts the object's parameters into a comma-separated string
         *
         * @returns {(string | null)}
         */
        serialize(): string | null 
        {
            if (this.DisplayName !== "" && this.EmailAddress !== "" && this.Username !== "") 
            {
                return `${this.DisplayName},${this.EmailAddress},${this.Username}`;
            }
            console.error("One or more properties of the User Object are missing or empty");
            return null;
        }

        /**
         * This method takes the data string parameter and separates it into the object's properties
         *
         * @param {string} data
         * @returns {void}
         */
        deserialize(data: string): void 
        {
            let propertyArray = data.split(",");
            this.DisplayName = propertyArray[0];
            this.EmailAddress = propertyArray[1];
            this.Username = propertyArray[2];
        }
    }

}