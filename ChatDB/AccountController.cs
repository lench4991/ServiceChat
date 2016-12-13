﻿using System.Web.Http;

namespace ChatDB
{
    [RoutePrefix("api/account")]
    public class AccountController : ApiController
    {
        // Get logged in user data
        // GET api/<controller>
        public object Get()
        {
            try
            {
                var account = Account.Authenticate();
                if (account == null) return Unauthorized();
                return Ok(account);
            }
            catch
            {
                return InternalServerError();
            }
        }

        // Register new user
        // POST api/<controller>
        public object Post([FromBody]dynamic data)
        {
            var list = data.name.Text.Split(' ').ToList<string>();
            var firstName = list[0];
            var lastName = list.Count > 1 ? list[1] : "";
            for (int i = 2; i < list.Count; i++)
                lastName += " " + list[i];

            try
            {
                var newAccount = Account.Create(firstName, lastName, data.username.Text, data.password.Text);
                return Ok(newAccount);
            }
            catch (Account.InvalidUsernameException)
            {
                return BadRequest("Uporabniško ime mora vsebovati vsaj 4 znake in le ASCII znake");
            }
            catch (Account.InvalidPasswordException)
            {
                return BadRequest("Geslo more bit ful zajebano z ciframi in klicaji in dvema velkima črkama");
            }
            catch (Account.UsernameDuplicateException)
            {
                return BadRequest("Račun z tem uporabniškim imenom že obstaja");
            }
            catch
            {
                return InternalServerError();
            }
        }

        // Edit account info
        // PUT api/<controller>
        public object Put([FromBody]dynamic data)
        {
            return NotFound();
        }
    }
}