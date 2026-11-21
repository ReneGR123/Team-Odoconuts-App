import { describe, it , vi, expect} from "vitest";
import { reportQuest } from "../src/utils/reportValidation";

describe("reportQuestData", () => {
    //testing if a quest can be reported
    it("checks that the backend sends the correct info to supabase ", async () =>{
    //Christmas carolers quests
    const questId = "5c614932-be75-4b02-97e0-996e482c88fa"

    const eq = vi.fn().mockResolvedValue({ error: null })
    const update = vi.fn().mockReturnValue({ eq })
    const from = vi.fn().mockReturnValue({ update })
    const fakeDb = { from }

    await reportQuest(fakeDb, questId)
    
    expect(from).toHaveBeenCalledWith("quests");
    expect(update).toHaveBeenCalledWith({isReported : true});
    expect(eq).toHaveBeenCalledWith("id", questId )
    })
})