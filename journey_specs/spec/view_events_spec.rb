
describe 'viewing events', type: :feature do

  it 'does stuff' do
    # proxy.stub('http://www.google.com/').and_return(:text => "I'm not Google!")
    # visit 'http://www.google.com/'
    # expect(page).to have_content("I'm not Google!")
    proxy.stub('https://accounts.google.com:443/o/oauth2/auth').and_return(:code => 404, :body => 'Not found')
    # proxy.stub('http://localhost:3001').and_return('not your home')
    visit '/'
    # expect(find_link('add my calendar')[:href]).to eq('https://accounts.google.com/o/oauth2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly&response_type=code&client_id=gcal_clientid&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fauthorize')
    click_on 'add my calendar'
    # expect(page)
    expect(page).to have_text 'you did it!'
  end
end

# class CalendarOwner
#   def add_calendar
#     expect(page).to have_text 'add my calendar'

#   end
