"""
utils/helpers.py – Reusable Selenium helper functions.
"""
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import TimeoutException, NoSuchElementException


def wait_for(driver, by, value, timeout=10):
    """Wait until an element is visible and return it."""
    return WebDriverWait(driver, timeout).until(
        EC.visibility_of_element_located((by, value))
    )


def wait_clickable(driver, by, value, timeout=10):
    """Wait until an element is clickable and return it."""
    return WebDriverWait(driver, timeout).until(
        EC.element_to_be_clickable((by, value))
    )


def fill_input(driver, by, value, text: str, clear=True):
    """Find, optionally clear, and type into an input field."""
    el = wait_for(driver, by, value)
    if clear:
        el.clear()
    el.send_keys(text)
    return el


def click(driver, by, value, timeout=10):
    """Wait until clickable and click."""
    el = wait_clickable(driver, by, value, timeout)
    el.click()
    return el


def page_has_text(driver, text: str, timeout=8) -> bool:
    """Return True if the given text appears anywhere on the page."""
    try:
        WebDriverWait(driver, timeout).until(
            EC.text_to_be_present_in_element((By.TAG_NAME, "body"), text)
        )
        return True
    except TimeoutException:
        return False


def current_url_contains(driver, fragment: str, timeout=8) -> bool:
    """Return True if the current URL contains the given fragment."""
    try:
        WebDriverWait(driver, timeout).until(EC.url_contains(fragment))
        return True
    except TimeoutException:
        return False


def element_exists(driver, by, value, timeout=3) -> bool:
    """Return True if element exists within timeout."""
    try:
        WebDriverWait(driver, timeout).until(
            EC.presence_of_element_located((by, value))
        )
        return True
    except TimeoutException:
        return False


def scroll_to_bottom(driver):
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(0.5)


def scroll_to_top(driver):
    driver.execute_script("window.scrollTo(0, 0);")
    time.sleep(0.3)
