﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EveHelper.API.Interfaces
{
    public interface IPusherRepository
    {
        Task InsertManyAsync(string collectionName, string json);
    }
}
