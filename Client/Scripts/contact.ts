namespace core 
{
    export class Contact 
    {
        // private instance members
        private m_fullName: string;
        private m_contactNumber: string;
        private m_emailAddress: string;

        // getters and setters
        public get FullName(): string
        {
            return this.m_fullName;
        }

        public set FullName(full_name:string)
        {
            this.m_fullName = full_name;
        }

        public get ContactNumber(): string 
        {
            return this.m_contactNumber;
        }

        public set ContactNumber(contact_number: string) 
        {
            this.m_contactNumber = contact_number;
        }

        public get EmailAddress(): string 
        {
            return this.m_emailAddress;
        }

        public set EmailAddress(email_address: string) 
        {
            this.m_emailAddress = email_address;
        }

        // constructor
        constructor(fullName: string = "", contactNumber: string = "", emailAddress: string = "") 
        {
            this.m_fullName = fullName;
            this.m_contactNumber = contactNumber;
            this.m_emailAddress = emailAddress;
        }

        // public methods

        /**
         * This method converts the object parameters into a comma-separated string
         *
         * @returns {(string | null)}
         */
        serialize(): string | null
        {
            if (this.FullName !== "" && this.ContactNumber !== "" && this.EmailAddress !== "") {
                return `${this.FullName},${this.ContactNumber},${this.EmailAddress}`;
            }
            console.error("One or more properties of the Contact Object are missing or empty");
            return null;
        }

        /**
         * This method takes its string parameter as an input and separates the data into the object properties
         *
         * @param {string} data
         * @returns {void}
         */
        deserialize(data: string): void
        {
            let propertyArray: string[] = data.split(",");
            this.FullName = propertyArray[0];
            this.ContactNumber = propertyArray[1];
            this.EmailAddress = propertyArray[2];
        }

        // overridden methods

        /**
         * This method overrides the built-in toString method and returns the values of the object properties
         * @override
         * @returns {string}
         */
        toString(): string 
        {
            return `Full Name     : ${this.FullName}\nContact Number: ${this.ContactNumber}\nEmail Address : ${this.EmailAddress}`;
        }
    }
}