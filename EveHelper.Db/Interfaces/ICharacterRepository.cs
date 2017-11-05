using EveHelper.DB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EveHelper.DB.Interfaces
{
    public interface ICharacterRepository
    {
        Task<CharacterModel> GetCharacter(string id);
        Task AddCharacter(CharacterModel character);
    }
}
