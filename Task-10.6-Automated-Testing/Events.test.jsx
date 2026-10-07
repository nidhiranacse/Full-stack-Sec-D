import {render,screen} from "@testing-library/react";import Events from "./Events";
test("renders event list heading",()=>{render(<Events/>);expect(screen.getByText(/events/i)).toBeInTheDocument()});
test("renders search field",()=>{render(<Events/>);expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument()});
test("renders an event title",async()=>{render(<Events/>);expect(await screen.findByText(/tech fest/i)).toBeInTheDocument()});
