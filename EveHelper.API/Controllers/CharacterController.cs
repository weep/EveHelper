using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using EveHelper.ORM.Interfaces;
using EveHelper.ORM.Models;
using Newtonsoft.Json;
using System.Net.Http;

namespace EveHelper.API.Controllers
{
    [Produces("application/json")]
    [Route("api/character")]
    public class CharacterController : Controller
    {
        //private readonly ICharacterRepository _characterRepository;

        //public CharacterController(ICharacterRepository characterRepository)
        //{
        //    _characterRepository = characterRepository;
        //}

        //// POST api/Character
        //[HttpPost]
        //public async Task<IActionResult> Post([FromBody]CharacterModel characterModel)
        //{
        //    var character = Get(characterModel.Id).Result;
        //    if (character != null)
        //        return Ok();
        //    await _characterRepository.AddCharacter(characterModel);
        //    return await Task.FromResult(Created("", characterModel));
        //}

        //// GET api/Character/5
        //[HttpGet("{id}")]
        //public async Task<CharacterModel> Get(string id)
        //{
        //    return await GetCharacterById(id);
        //}

        //private async Task<CharacterModel> GetCharacterById(string id)
        //{
        //    var character = await _characterRepository.GetCharacter(id);
        //    return character;
        //}
    }
}