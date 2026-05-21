"""Project-wide DRF exception handling."""

from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    """Delegate to DRF's default handler.

    This keeps the configured import path valid while leaving response behavior
    unchanged until the project needs custom API error envelopes.
    """
    return exception_handler(exc, context)

