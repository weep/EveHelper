using Microsoft.AspNetCore.Antiforgery;
using EveHelper.Controllers;

namespace EveHelper.Web.Host.Controllers
{
    public class AntiForgeryController : EveHelperControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AntiForgeryController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }
    }
}
