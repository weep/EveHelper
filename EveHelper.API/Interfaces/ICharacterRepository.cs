using EveHelper.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EveHelper.API.Interfaces
{
    public interface ICharacterRepository
    {
        Task<CharacterModel> GetCharacter(string id);
        Task AddCharacter(CharacterModel character);
    }
}
