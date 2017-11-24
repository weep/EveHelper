using System.ComponentModel.DataAnnotations;

namespace EveHelper.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}