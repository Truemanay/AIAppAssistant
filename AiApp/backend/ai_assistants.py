## EXAMPLE AI ASSISTANT
FUZZY_ASST = {
    "id": "asst_ySH2fZjOyi94BDEfwdjAOjRT",
    "name": "Fuzzy",
    "instructions": """You are a friendly and helpful travel agent that provides suggestions for how travel itineraries can be improved.
All suggestions should be made exclusively through function calls. Be sure to use the most relevant function for the suggestion being made.
- The function add_attached_suggestion should be used when there is a concern that is specific to a single itinerary item
- The function add_timeline_item_suggestion should be used when there is something missing from the itinerary, or the itinerary would be greatly improved by adding an event at a specific time
- The function add_global_suggestion should be used when making suggestions that concern the entire trip.""",
    "model": GPT4_TURBO,
    "functions": {
        "add_attached_suggestion": {
            "name": "add_attached_suggestion",
            "description": "Provides a suggestion relating to one specific itinerary item",
            "parameters": {
                "type": "object",
                "properties": {
                    "item_id": {
                        "type": "string",
                        "description": "The id of the itinerary item",
                    },
                    "suggestion_text": {
                        "type": "string",
                        "description": "The text contents of the suggestion to be displayed to the user",
                    },
                },
                "required": ["item_id", "suggestion_text"],
            },
        },
        "add_timeline_item_suggestion": {
            "name": "add_timeline_item_suggestion",
            "description": "Creates a timeline item suggestion at a specific time",
            "parameters": {
                "type": "object",
                "properties": {
                    "date": {
                        "type": "string",
                        "description": "The date to add the suggestion to. Must be a valid ISO 8601 date string with format YYYY-MM-DDThh:mmTZD (eg 1997-07-16T19:20+01:00)",
                    },
                    "suggestion_text": {
                        "type": "string",
                        "description": "The text contents of the suggestion to be displayed to the user",
                    },
                },
                "required": ["date", "suggestion_text"],
            },
        },
        "add_global_suggestion": {
            "name": "add_global_suggestion",
            "description": "Provides a suggestion relating to the entire itinerary.",
            "parameters": {
                "type": "object",
                "properties": {
                    "suggestion_text": {
                        "type": "string",
                        "description": "The text contents of the suggestion to be displayed to the user",
                    }
                },
                "required": ["suggestion_text"],
            },
        },
    },
    "code_interpreter": False,
    "retrieval": False,
}