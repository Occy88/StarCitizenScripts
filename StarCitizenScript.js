/**
* This script is for: https://robertsspaceindustries.com/roadmap/board/1-Star-Citizen
* Purpose: gives you quick stats on any release version e.g.t 3.11, 3.12...
* to use: copy and paste this into console of website. then type get_stats(version_number) e.g. get_stats(3.11)
* To open console: ctrl+shift+i then choose console tab
* e.g: get_stats(3.11)
*/


const RELEASE_SECTION_HOLDER_CLASS_NAME = "Board__Releases-c7lmub-15 ftcDnO"

const CLOSED_RELEASE_NAME_CLASS_NAME = "Release__Name-sc-1y9ya50-3 kTRWwp"
const OPEN_RELEASE_NAME_CLASS_NAME = "Release__Name-sc-1y9ya50-3 jlyWkz"
const OPEN_RELEASE_CATEGORIES_HOLDER_CLASS_NAME = "Category__Wrapper-sc-3z36kz-0 goVOoT"
const CLOSED_CATEGORY_CLASS_HEADER = "Category__Header-sc-3z36kz-1 iKcoRB"
const OPEN_CATEGORY_CARD_HOLDER_CLASS_NAME = "Category__Cards-sc-3z36kz-7 fFjEap"
const CLOSED_CATEGORY_CARD_HOLDER_CLASS_NAME = "Category__Cards-sc-3z36kz-7 fVIOaf"

const PROGRESS_CLASS_NAME = "Progress__Stats-s5kjug-2 jdFTXj"
const STATUS_CLASS_NAME = "Card__Status-a2fcbm-9 dpdFGl"

const RELEASED_VAL = "Released"
const DEVELOPMENT_VAL = "In Development"
const SCHEDULED_VAL = "Scheduled"
const POLISHING_VAL = "Polishing"

/**
 * Gets the release the user wishes to analyse.
 * @param version_number
 */
function get_release(version_number) {
    version_number = version_number.toString()
    let releases = document.getElementsByClassName(RELEASE_SECTION_HOLDER_CLASS_NAME)[0];
    for (let r of releases.children) {
        let version_holder = null;
        if (r.getElementsByClassName(CLOSED_RELEASE_NAME_CLASS_NAME).length >= 1) {
            version_holder = r.getElementsByClassName(CLOSED_RELEASE_NAME_CLASS_NAME)[0]
        } else {
            version_holder = r.getElementsByClassName(OPEN_RELEASE_NAME_CLASS_NAME)[0]
        }
        if (version_holder.innerHTML === version_number) {
            return r
        }
    }
}

function get_stats(version_number) {
    let r = get_release(version_number)
    //open the release if it isnt
    if (r.getElementsByClassName(CLOSED_RELEASE_NAME_CLASS_NAME).length >= 1) {
        r.children[0].click()
    }

    // now for each of the entries open it of not open, and count nubmer of whatevers.
    // for each entry call function to open/get percentage.
    let stats = {
        scheduled: 0,
        development: 0,
        development_done: 0,
        development_total: 0,
        polished: 0,
        released: 0,
       

    }
    for (let category of r.getElementsByClassName(OPEN_RELEASE_CATEGORIES_HOLDER_CLASS_NAME)) {
        let potential_cat_holder = category.getElementsByClassName(OPEN_CATEGORY_CARD_HOLDER_CLASS_NAME)
        //open up each category if it is closed...

        if (potential_cat_holder.length === 0) {
            category.getElementsByClassName(CLOSED_CATEGORY_CLASS_HEADER)[0].click()
        }
        //get the status and determine percentage.
        //scheduled
        let status_cards = category.getElementsByClassName(STATUS_CLASS_NAME)
        let progress_cards = category.getElementsByClassName(PROGRESS_CLASS_NAME)

        for (let p of status_cards) {
            switch (p.innerText) {
                case RELEASED_VAL:
                    stats.released += 1
                    break;
                case DEVELOPMENT_VAL:
                    stats.development += 1;
                    break;
                case SCHEDULED_VAL:
                    stats.scheduled += 1;
                    break;
            }
        }
        for (let p of progress_cards) {
            if (p.innerText === POLISHING_VAL) {
                stats.polished += 1
            } else {
                let vals = p.innerText.split('/')
                stats.development_total += parseInt(vals[1])
                stats.development_done += parseInt(vals[0])
            }

        }

    }
    stats.percentage = stats.development_done / stats.development_total
    for (let p in stats) {
        console.log(p, " : ", stats[p])
    }
    return stats;
}

