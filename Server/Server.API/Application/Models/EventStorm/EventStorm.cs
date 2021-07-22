using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Server.Domain;
using Server.Infrastructure.Utilities;

namespace Server.API.Models
{
    public class EventStormDTO
    {
        public List<EventEdgeDTO> Edges { get; set; }
        public List<EventBlockDTO> Blocks { get; set; }

        public static EventStormDTO Map(EventStorm storm) {

            var blocks = storm.Blocks.ConvertAll<EventBlockDTO>(
                new Converter<EventBlock, EventBlockDTO>(EventBlockDTO.Map));

            var edges = storm.Edges.ConvertAll<EventEdgeDTO>(
                new Converter<EventEdge, EventEdgeDTO>(EventEdgeDTO.Map));

            return new EventStormDTO() {
                Blocks = blocks,
                Edges = edges
            };
        }
    }
}