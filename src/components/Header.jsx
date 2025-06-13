import chefImage from "/src/images/chef-claude-icon.png"

export default function Header() {
    return(
        <header>
            <img src={chefImage} alt="chef icon" />
            <h1>Chef Cruz</h1>
        </header>
    )
}