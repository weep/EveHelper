﻿using EveHelper.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EveHelper.API.Models;
using Microsoft.Extensions.Options;
using EveHelper.API.Context;
using MongoDB.Driver;

namespace EveHelper.API.Repositories
{
    public class CharacterRepository : ICharacterRepository
    {
        private readonly CharacterContext _context = null;

        public CharacterRepository(IOptions<DbSettings> settings)
        {
            _context = new CharacterContext(settings);
        }

        public async Task AddCharacter(CharacterModel character)
        {
            await _context.Characters.InsertOneAsync(character);
        }

        public async Task<CharacterModel> GetCharacter(string id)
        {
            var filter = Builders<CharacterModel>.Filter.Eq("Id", id);
            return await _context.Characters
                                 .Find(filter)
                                 .FirstOrDefaultAsync();
        }
    }
}